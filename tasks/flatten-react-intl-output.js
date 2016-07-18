import * as fs from 'fs';
import {sync as globSync} from 'glob';

const MESSAGES_PATTERN = './app/i18n/app/**/*.json';
const I18N_DIR         = './app/i18n/';
// Adapted from https://github.com/yahoo/react-intl/blob/9aa03bd123d3bb24e9b95524447e23d044badcbc/examples/translations/scripts/translate.js

// Aggregates the default messages that were extracted from the app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
let defaultMessages = globSync(MESSAGES_PATTERN)
  .map((filename) => fs.readFileSync(filename, 'utf8'))
  .map((file) => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({id, defaultMessage}) => {
      if (collection.hasOwnProperty(id)) {
          throw new Error(`Duplicate message id: ${id}`);
      }

      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

fs.writeFileSync(I18N_DIR + 'en.json', JSON.stringify(defaultMessages, null, 2));