import os
import json

from apiclient import discovery
from httplib2 import Http
from oauth2client import client, file, tools
from dotenv import load_dotenv, dotenv_values

load_dotenv()
config = dotenv_values("config.env")

# https://developers.google.com/forms/api/guides/retrieve-forms-responses#python

SCOPES = [
    "https://www.googleapis.com/auth/forms.body.readonly",
    "https://www.googleapis.com/auth/forms.responses.readonly"
]
DISCOVERY_DOC = "https://forms.googleapis.com/$discovery/rest?version=v1"

store = file.Storage('client_token.json')

creds = None
if not creds or creds.invalid:
    flow = client.flow_from_clientsecrets('client_secrets.json', SCOPES)
    creds = tools.run_flow(flow, store)
service = discovery.build('forms', 'v1', http=creds.authorize(
    Http()), discoveryServiceUrl=DISCOVERY_DOC, static_discovery=False)

form_id = config["FORM_ID"]

# Prints the title of the sample form:
result = service.forms().get(formId=form_id).execute()
with open(os.path.join(config["BUILD_DIR"], config["FORM_METADATA_FILENAME"]), "w") as outfile:
    json.dump(result, outfile, indent=2)

# Prints the responses of your specified form:
result = service.forms().responses().list(formId=form_id).execute()
with open(os.path.join(config["BUILD_DIR"], config["FORM_RESPONSES_FILENAME"]), "w") as outfile:
    json.dump(result, outfile, indent=2)
