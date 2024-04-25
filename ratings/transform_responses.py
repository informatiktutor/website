import os
import json
import yaml
import hashlib

from dotenv import dotenv_values


config = dotenv_values("config.env")

def load_build_json(filename, directory=config["BUILD_DIR"]):
    metadata_filename = os.path.join(directory, filename)
    with open(metadata_filename, "r") as f:
        return json.load(f)

def load_mapping(filename, directory=config["MAPPINGS_DIR"]):
    metadata_filename = os.path.join(directory, filename)
    with open(metadata_filename, "r") as f:
        return yaml.safe_load(f)

def transform_id(response_id):
    # Compute the SHA256 hash of the response id,
    # then trim it to only the first 12 characters.
    return hashlib.sha256(response_id.encode()).hexdigest()[:12]

def transform_ratings(raw_responses, keys, transformations):
    result = []
    for raw_response in raw_responses:
        raw_answers = raw_response["answers"]
        response = dict()
        add_item = lambda k, t=lambda v: v: \
            response.update({k: t(raw_answers[keys[k]]["textAnswers"]["answers"][0]["value"].strip())} if keys[k] in raw_answers else {})
        response_id = transform_id(raw_response["responseId"])
        response["id"] = response_id
        response["timestamp"] = raw_response["createTime"]
        add_item("satisfaction_value", lambda v: int(v))
        add_item("review_text")
        add_item("customer_name_abbreviated")
        add_item("service_date")
        add_item("course_name")
        add_item("degree_name")
        add_item("current_semester", lambda v: (
            semester_value := int(v.split('.')[0]),
            str(semester_value) if semester_value < 12 else "12+"
        )[-1])
        add_item("consent_for_public_display", lambda v: v.lower() == "ja")
        if response_id in transformations:
            transforms = transformations[response_id]
            if "trustpilot_url" in transforms:
                response["trustpilot_url"] = transforms["trustpilot_url"]
            if "corrections" in transforms:
                for replacement in transforms["corrections"]:
                    key = replacement["key"]
                    find = replacement["find"]
                    replace = replacement["replace"]
                    if find == "*":
                        response[key] = ""
                    else:
                        response[key] = response[key].replace(find, replace)
        # only export the result if there is consent for public display.
        if response["consent_for_public_display"] == True:
            result.append(response)
    return result

def main():
    metadata = load_build_json(config["FORM_METADATA_FILENAME"])
    responses = load_build_json(config["FORM_RESPONSES_FILENAME"])

    # make sure we are working with the expected form revision
    assert metadata["revisionId"] == config["FORM_EXPECTED_REVISION_ID"]

    result = transform_ratings(
        responses["responses"],
        load_mapping("question_key_to_id.yaml"),
        load_mapping("transformations.yaml"))

    result.sort(key=lambda r: r["timestamp"])

    with open(os.path.join(config["OUT_DIR"], "ratings.min.json"), "w") as outfile:
        json.dump(result, outfile, separators=(',', ':'))
    with open(os.path.join(config["OUT_DIR"], "ratings.json"), "w") as outfile:
        json.dump(result, outfile, indent=2)

if __name__ == "__main__":
    main()
