import gql from 'graphql-tag';


export const QUERY_DOCUMENTS = gql`
    query documentList($filter: String, $includeSynoyms: Boolean ) {
        documents(filter: $filter, includeSynoyms: $includeSynoyms){
            id
            content
            filetype
            filename
            client
            tag
        }
    }
`;

export const QUERY_PARAGRAPHS = gql`
    query paragraphList($filter: String, $includeSynoyms: Boolean) {
        paragraphs(filter: $filter, includeSynoyms: $includeSynoyms){
            id
            tag
            isPartOf
            content
        }
    }
`;

export const SUBSCRIPTION_ADD_DOCUMENT = gql`
    subscription{
        documentAdded{
            id
            content
            filetype
            filename
            client
            tag
        }
    }
`;

export const MUTATION_ADD_DOCUMENT = gql`
    mutation addDocument($input: DocumentInput) {
        addDocument(input: $input) {
            id
        }
    }
`;