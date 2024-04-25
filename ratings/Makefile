.PHONY: all fetch_form_data transform_responses export_output clean

VENV_DIR=venv
VENV_ACTIVATE=$(VENV_DIR)/bin/activate

BUILD_DIR=build
OUT_DIR=$(BUILD_DIR)/out
EXPORT_DIR=../src/data/shared

all: ./$(VENV_DIR) fetch_form_data transform_responses export_output

./$(VENV_DIR):
	python3 -m venv $(VENV_DIR)
	. $(VENV_ACTIVATE); \
		python3 -m pip install pip --upgrade; \
		python3 -m pip install -r requirements.txt

fetch_form_data: fetch_form_data.py config.env .env client_secrets.json
	rm -rf $(BUILD_DIR)
	mkdir -p $(BUILD_DIR)
	. $(VENV_ACTIVATE); \
		python3 fetch_form_data.py

transform_responses: transform_responses.py $(BUILD_DIR)/form_metadata.json $(BUILD_DIR)/form_responses.json
	rm -rf $(OUT_DIR)
	mkdir -p $(OUT_DIR)
	. $(VENV_ACTIVATE); \
		python3 transform_responses.py

export_output: ./$(OUT_DIR) transform_responses
	rm -f $(EXPORT_DIR)/*
	mkdir -p $(EXPORT_DIR)
	cp $(OUT_DIR)/* $(EXPORT_DIR)

clean:
	rm -rf $(BUILD_DIR)
	rm -f $(EXPORT_DIR)/*
	rm -rf client_token.json
