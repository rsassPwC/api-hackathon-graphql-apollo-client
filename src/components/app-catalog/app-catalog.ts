import { fetchDocuments, checkDocuments, fetchParagraphs, SearchSettings, checkParagraph } from './actions';
import { LitElement, html, css, customElement, property, query } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store, RootState } from '../../store';
import { Paragraph } from '../../graphql/Paragraph';
import { Document } from '../../graphql/Document';

import '@appkit-web-components/navigation-header/lib/appkit-navigation-header.min'
import '@appkit-web-components/panel/lib/appkit-panel.min'
import '@appkit-web-components/panel/lib/appkit-panel-header.min'
import '@appkit-web-components/input/lib/appkit-input.min'
import '@appkit-web-components/button/lib/appkit-button.min'
import '@appkit-web-components/badge/lib/appkit-badge.min'

@customElement('app-catalog')
export class AppCatalog extends connect(store)(LitElement) {

  @query("#search-includes-synonyms")
  private _searchIncludesSynonymsCheckbox: HTMLInputElement;

  @query("#search-input")
  private _searchInput: HTMLInputElement;

  @property({ type: Array })
  private _documents: Array<Document> = [];

  @property({ type: Array })
  private _paragraphs: Array<Paragraph> = [];

  @property({ type: Boolean })
  private _userHasSearched: Boolean = false;

  @property({ type: Boolean })
  private _documentsAvailable: Boolean = true;

  @property({ type: Boolean })
  private _paragraphsAvailable: Boolean = true;

  @property({ type: String })
  private _errorText: string = '';

  stateChanged(state: RootState) {
    this._documents = state.appState.documents;
    this._paragraphs = state.appState.paragraphs;
    this._documentsAvailable = state.appState.documentsAvailable;
    this._paragraphsAvailable = state.appState.paragraphsAvailable;
  }

  firstUpdated() {
    let searchSettings: SearchSettings = {
      query: "",
      includeSynoyms: this._searchIncludesSynonymsCheckbox.checked
    };
    store.dispatch(checkDocuments(searchSettings));
    store.dispatch(checkParagraph(searchSettings));
  };

  private _search() {
    if (this._searchInput.value.length > 0) {
      this._userHasSearched = true;
      this._errorText = '';
      let searchSettings: SearchSettings = {
        query: this._searchInput.value,
        includeSynoyms: this._searchIncludesSynonymsCheckbox.checked
      };
      store.dispatch(fetchDocuments(searchSettings));
      store.dispatch(fetchParagraphs(searchSettings));
    }
    else {
      this._errorText = 'Please type in a query.';
    }
  }

  protected render() {
    let searchResult = html``;
    let noDocumentsAvailable = html``;
    let noParagraphsAvailable = html``;

    if (this._userHasSearched) {
      searchResult = html`
        <appkit-panel class="search-panel search-result">
          <appkit-panel-header slot="header">No Results found</appkit-panel-header>
          <div class="search-element-container">Please refine your query</div>
        </appkit-panel>
      `;

      if (!this._documentsAvailable) {
        if (this._documentsAvailable || !this._paragraphsAvailable) {
          searchResult = html``;
        }
        noDocumentsAvailable = html`
        <appkit-panel class="search-panel search-result">
          <appkit-panel-header slot="header">No Documents available</appkit-panel-header>
          <div class="search-element-container">Please upload Data</div>
        </appkit-panel>
      `;
      }

      if (!this._paragraphsAvailable) {
        if (!this._documentsAvailable || this._paragraphsAvailable) {
          searchResult = html``;
        }
        noParagraphsAvailable = html`
        <appkit-panel class="search-panel search-result">
          <appkit-panel-header slot="header">No Paragraphs available</appkit-panel-header>
          <div class="search-element-container">Please upload Data</div>
        </appkit-panel>
      `;
      }

      if (this._documents.length > 0) {
        searchResult = html``;

        this._documents.map(document => {
          searchResult = html`${searchResult}
            <appkit-panel class="search-panel search-result">
              <ul class="a-list">
                <li class="a-list-item d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <div class="a-thumbnail-round a-thumbnail-32 a-mr-10">${document.id}</div>
                    <div>
                      <div class="a-h6 text-truncate">Document: ${document.client}</div>
                      <div class="a-opacity-50 a-h6 font-weight-normal text-truncate">Filename: ${document.filename}</div>
                    </div>
                  </div>
                  <div class="a-h6 text-truncate"><appkit-badge>${document.tag}</appkit-badge></div>
                </li>
              </ul>
            </appkit-panel>
          `;
        });
      }
      if (this._paragraphs.length > 0) {
        if (this._documents.length == 0) {
          searchResult = html``;
        }
        this._paragraphs.map(paragraph => {
          searchResult = html`${searchResult}
          <appkit-panel class="search-panel search-result">
            <ul class="a-list">
              <li class="a-list-item d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="a-thumbnail-round a-thumbnail-32 a-mr-10">${paragraph.id}</div>
                  <div>
                    <div class="a-h6 text-truncate">Paragraph: ${paragraph.content}</div>
                    <div class="a-opacity-50 a-h6 font-weight-normal text-truncate">Is part of: ${paragraph.isPartOf}</div>
                  </div>
                </div>
                <div class="a-h6 text-truncate"><appkit-badge>${paragraph.tag}</appkit-badge></div>
              </li>
            </ul>
          </appkit-panel>
        `;
        });
      }
    }

    return html`
      <link rel="stylesheet" href="node_modules/@appkit-web-components/base/lib/appkit-base.min.css"/>
      <appkit-navigation-header class="navigation-header" application-name="Search">
        <span class="a-pwc-logo-grid" slot="logo">PwC</span>
        <div slot="toolbar"></div>
      </appkit-navigation-header>

      <appkit-panel class="search-panel">
        <appkit-panel-header slot="header">Search</appkit-panel-header>
        <appkit-input id="search-input" @keypress=${e => { e.key == 'Enter' ? this._search() : false; }} placeholder="(keyword OR keyword2) AND tag:myTag" class="search-input" error=${this._errorText}>
        </appkit-input>
        <div class="search-element-container">
          <div>
            <input type="checkbox" id="search-includes-synonyms">
            <label for="search-is-synonyms">Include synonyms</label>
          </div>
          <appkit-button @click=${this._search} id="search-button">Submit</appkit-button>
        </div>
        <div class="search-hint"><span class="caption">Hint</span>: You can use colons for filters like you know from google</div>
      </appkit-panel>
      ${searchResult} ${noDocumentsAvailable} ${noParagraphsAvailable}
    `;
  }

  static get styles() {
    return css`
      .search-panel {
        width: 50rem;
        margin: auto;  
      }
      .search-element-container {
        padding: 0.5rem 0;
        display: flex;
        justify-content: space-between;
      }
      .search-input {
        width: 100%;
        margin-right: 1rem;
      }
      .search-hint {
        margin-top: 1rem;
        padding-bottom: 2rem;
        font-style: italic;
      }
      .search-hint .caption {
        font-weight: bold;
      }
      .search-result {
        margin-top: 1rem;
      }
      .navigation-header {
        width: 100%;
        margin-bottom: 2rem;
      }
      .d-flex {
        display: flex;
        align-items: center;
      }
      .justify-content-between {
        justify-content: space-between;
      }
      .a-list-item {
        padding: 1rem 0;
      }
      :host {
        display: flex;
        flex-direction: column;
      }
      .a-thumbnail-round {
        border-radius:50%;
        background:#d8d8d8;
        display:inline-flex;
        justify-content:center;
        align-items:center
      }
      .a-thumbnail-round.a-thumbnail-32 {
        width:2rem;
        height:2rem
      }
    `;
  }
}