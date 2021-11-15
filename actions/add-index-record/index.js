const { inspect } = require("util");
const core = require('@actions/core');
const algoliasearch = require('algoliasearch');

async function run() {
  try {
    const inputs = {
      appId: core.getInput('app_id'),
      apiKey: core.getInput('api_key'),
      indexName: core.getInput('index_name'),
      record: core.getInput('record'),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    if (!inputs.appId && !inputs.apiKey && !inputs.indexName) {
      core.setFailed("Missing one or more of Algolia app id, API key, or index name.");
      return;
    }

    core.info(`Writing record to index ${inputs.indexName}`)
    const client = algoliasearch(inputs.appId, inputs.apiKey);
    const index = client.initIndex(inputs.indexName);

    index.saveObject(JSON.parse(inputs.record), {'autoGenerateObjectIDIfNotExist': true})
      .then(({ objectID }) => {
        core.info(
          `Created record in index ${inputs.indexName} with objectID ${objectID}.`
        );
      })
      .catch((err) => {
        core.setFailed(`Failed to save object: ${err}`);
      });

  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
    if (error.message == 'Resource not accessible by integration') {
      core.error(`See this action's readme for details about this error`);
    }
  }
}

run();