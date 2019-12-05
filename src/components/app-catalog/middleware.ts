import { Middleware, MiddlewareAPI } from "redux";
import { FETCH_DOCUMENTS, CHECK_DOCUMENTS, updateDocuments, updateParagraphs, documentAvailable, FETCH_PARAGRAPHS, CHECK_PARAGRAPHS, paragraphsAvailable } from "../app-catalog/actions";
import { Document } from '../../graphql/Document';
import { Paragraph } from '../../graphql/Paragraph';
import { client } from "../../graphql/client";
import { QUERY_DOCUMENTS, QUERY_PARAGRAPHS } from "../../graphql/queries";

export const DataMiddleware: Middleware = ({ getState }: MiddlewareAPI) => next => (action: any) => {
  next(action);
  switch (action.type) {
    case CHECK_DOCUMENTS:
      client.query<Document[]>({
        query: QUERY_DOCUMENTS,
        variables: {
          "filter": action.searchSettings.query,
          "includeSynoyms": action.searchSettings.includeSynoyms
        },
      }).then((result: any) => {
        let documents: Array<Document> = result.data.documents;
        next(documentAvailable(documents.length > 0 ? true : false));
      }).catch(error => console.log(error));
      break;
    case CHECK_PARAGRAPHS:
      client.query<Paragraph[]>({
        query: QUERY_PARAGRAPHS,
        variables: {
          "filter": action.searchSettings.query,
          "includeSynoyms": action.searchSettings.includeSynoyms
        },
      }).then((result: any) => {
        let paragraphs: Array<Paragraph> = result.data.paragraphs;
        next(paragraphsAvailable(paragraphs.length > 0 ? true : false));
      }).catch(error => console.log(error));
      break;
    case FETCH_DOCUMENTS:
      client.query<Document[]>({
        query: QUERY_DOCUMENTS,
        variables: {
          "filter": action.searchSettings.query,
          "includeSynoyms": action.searchSettings.includeSynoyms
        },
      }).then((result: any) => {
        let documents: Array<Document> = result.data.documents;
        next(updateDocuments(documents));
      }).catch(error => console.log(error));
      break;
    case FETCH_PARAGRAPHS:
      client.query<Paragraph[]>({
        query: QUERY_PARAGRAPHS,
        variables: {
          "filter": action.searchSettings.query,
          "includeSynoyms": action.searchSettings.includeSynoyms
        },
      }).then((result: any) => {
        let paragraphs: Array<Paragraph> = result.data.paragraphs;
        next(updateParagraphs(paragraphs));
      }).catch(error => console.log(error));
      break;
    default:
      break;
  }
};