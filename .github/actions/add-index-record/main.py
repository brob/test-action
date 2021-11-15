import os

from algoliasearch.search_client import SearchClient

client = SearchClient.create(os.environ.get("INPUT_APP_ID"), os.environ.get("INPUT_API_KEY"))
index = client.init_index(os.environ.get("INPUT_INDEX_NAME"))
record = os.environ.get("INPUT_INDEX_FILE_PATH"))

index.save_object(record,  {'autoGenerateObjectIDIfNotExist': True})
