import { AppActionTypes, FETCH_DOCUMENTS, UPDATE_DOCUMENTS, UPDATE_PARAGRAPHS, CHECK_AVAILABLE_PARAGRAPHS, CHECK_AVAILABLE_DOCUMENTS } from './actions';
import { Document } from '../../graphql/Document';
import { Paragraph } from '../../graphql/Paragraph';

export interface AppState {
    documents: Array<Document>
    paragraphs: Array<Paragraph>
    documentsAvailable: boolean
    paragraphsAvailable: boolean
}

const INITIAL_STATE: AppState = {
    documents: [],
    paragraphs: [],
    documentsAvailable: false,
    paragraphsAvailable: false
}

export const appReducer = (state: AppState = INITIAL_STATE, action: AppActionTypes): AppState => {
    switch (action.type) {
        case FETCH_DOCUMENTS:
            return {
                ...state
            };

        case UPDATE_DOCUMENTS:
            return {
                ...state,
                documents: action.documents
            };

        case UPDATE_PARAGRAPHS:
            return {
                ...state,
                paragraphs: action.paragraphs
            };

        case CHECK_AVAILABLE_DOCUMENTS:
            return {
                ...state,
                documentsAvailable: action.documentsAvailable
            };

        case CHECK_AVAILABLE_PARAGRAPHS:
            return {
                ...state,
                paragraphsAvailable: action.paragraphsAvailable
            };

        default: return state;
    }
}
