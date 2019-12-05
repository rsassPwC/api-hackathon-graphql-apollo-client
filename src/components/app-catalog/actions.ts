import { Document } from '../../graphql/Document';
import { Paragraph } from '../../graphql/Paragraph';

export const FETCH_DOCUMENTS = "APP_FETCH_DOCUMENTS";
export const FETCH_PARAGRAPHS = "APP_FETCH_PARAGRAPHS";
export const UPDATE_DOCUMENTS = "APP_UPDATE_DOCUMENTS";
export const UPDATE_PARAGRAPHS = "APP_UPDATE_PARAGRAPHS";

export const CHECK_DOCUMENTS = "APP_CHECK_DOCUMENTS";
export const CHECK_PARAGRAPHS = "APP_CHECK_PARAGRAPHS";
export const CHECK_AVAILABLE_DOCUMENTS = "APP_CHECK_AVAILABLE_DOCUMENTS";
export const CHECK_AVAILABLE_PARAGRAPHS = "APP_CHECK_AVAILABLE_PARAGRAPHS";

export interface SearchSettings {
    query: string,
    includeSynoyms: boolean
}

interface FetchDocumentsAction {
    type: typeof FETCH_DOCUMENTS,
    searchSettings: SearchSettings
}

interface FetchParagraphsAction {
    type: typeof FETCH_PARAGRAPHS,
    searchSettings: SearchSettings
}
interface UpdateParagraphAction {
    type: typeof UPDATE_PARAGRAPHS,
    paragraphs: Array<Paragraph>
}

interface UpdateDocumentsAction {
    type: typeof UPDATE_DOCUMENTS,
    documents: Array<Document>
}

interface DocumentsAvailableAction {
    type: typeof CHECK_AVAILABLE_DOCUMENTS,
    documentsAvailable: boolean
}

interface ParagraphsAvailableAction {
    type: typeof CHECK_AVAILABLE_PARAGRAPHS,
    paragraphsAvailable: boolean
}


export const fetchDocuments = (searchSettings: SearchSettings) => {
    return {
        type: FETCH_DOCUMENTS,
        searchSettings
    }
}

export const checkDocuments = (searchSettings: SearchSettings) => {
    return {
        type: CHECK_DOCUMENTS,
        searchSettings
    }
}

export const checkParagraph = (searchSettings: SearchSettings) => {
    return {
        type: CHECK_PARAGRAPHS,
        searchSettings
    }
}

export const documentAvailable = (documentsAvailable: boolean) => {
    return {
        type: CHECK_AVAILABLE_DOCUMENTS,
        documentsAvailable
    }
}

export const paragraphsAvailable = (paragraphsAvailable: boolean) => {
    return {
        type: CHECK_AVAILABLE_PARAGRAPHS,
        paragraphsAvailable
    }
}

export const fetchParagraphs = (searchSettings: SearchSettings) => {
    return {
        type: FETCH_PARAGRAPHS,
        searchSettings
    }
}

export const updateDocuments = (documents: Array<Document>) => {
    return {
        type: UPDATE_DOCUMENTS,
        documents
    }
}

export const updateParagraphs = (paragraphs: Array<Paragraph>) => {
    return {
        type: UPDATE_PARAGRAPHS,
        paragraphs
    }
}

export type AppActionTypes = UpdateDocumentsAction | FetchDocumentsAction | FetchParagraphsAction | UpdateParagraphAction | DocumentsAvailableAction | ParagraphsAvailableAction;