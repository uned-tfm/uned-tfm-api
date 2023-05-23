export type UseCase<Input, Response> = (input?: Input) => Promise<Response>;
