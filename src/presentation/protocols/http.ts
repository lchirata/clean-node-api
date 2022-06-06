export interface httpResponse{
    statusCode: number,
    body: any
}

export interface httpRequest{
    body?: any  // pode ou não ter o body
}