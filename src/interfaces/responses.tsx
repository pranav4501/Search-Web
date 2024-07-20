export interface ApiResponse {
    author: string;
    highlights: string;
    id: string;
    published_data: string;
    score: string;
    summary: string;
    text: string;
    title: string;
    url: string;
}

export interface ApiResponses {
    query: string;
    query_type: string;
    response: ApiResponse[];
}
