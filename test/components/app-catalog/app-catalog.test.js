import { html, fixture, expect } from '@open-wc/testing';

import '../../../out/components/app-catalog/app-catalog';

import "@appkit-web-components/button/lib/appkit-button.min";
import "@appkit-web-components/input/lib/appkit-input.min";
import "@appkit-web-components/panel/lib/appkit-panel.min";


describe('\nTESTING: App Catalog', () => {
  let appCatalog;
  let searchText;
  let searchButton;
  let includeSynonymsCheckbox;


  beforeEach(async () => {
    appCatalog = await fixture('<app-catalog></app-catalog>');
    appCatalog = appCatalog.shadowRoot;

    searchText = appCatalog.querySelector('#search-input');
    searchButton = appCatalog.querySelector('#search-button');
    includeSynonymsCheckbox = appCatalog.querySelector('#search-includes-synonyms');
  });

  describe('\nWhen App Catalog is initialized', () => {
    it('Has an empty Search Text and search button', async () => {
      expect(searchText.value).to.equal('');
      expect(searchButton.innerText).to.equal('Submit');
    });

    it('Has Includes Synonyms and Use Tags Checkbox unchcked', async () => {
      expect(includeSynonymsCheckbox.checked).to.equal(false);
    });
  });

  describe('\nWhen Search Text is empty', () => {
    it('Has Search Text and user pressed Enter key', async () => {
      let enterKeypressedEvent = new KeyboardEvent('keypress', {
        key: 'Enter'
      });
      await searchText.dispatchEvent(enterKeypressedEvent);
      expect(searchText.errorText).to.equal('Please type in a query.');
    });

    it('Has Search Button and user clicked the button', async () => {
      await searchButton.click();
      expect(searchText.errorText).to.equal('Please type in a query.');
    });
  });
});