export type UseCaseRequest<Input> = {
  input?: Input;
};

export type UseCase<Input, Response> = (request: UseCaseRequest<Input>) => Promise<Response>;
