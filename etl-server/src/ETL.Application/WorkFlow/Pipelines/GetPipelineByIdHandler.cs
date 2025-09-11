using ETL.Application.Abstractions.Pipelines;
using ETL.Domain.Entities;
using MediatR;

namespace ETL.Application.WorkFlow.Pipelines;

public record GetPipelineByIdQuery(Guid Id) : IRequest<Pipeline?>;


public class GetPipelineByIdHandler : IRequestHandler<GetPipelineByIdQuery, Pipeline?>
{
    private readonly IGetPipelineById _service;

    public GetPipelineByIdHandler(IGetPipelineById service) => _service = service;

    public Task<Pipeline?> Handle(GetPipelineByIdQuery request, CancellationToken cancellationToken) =>
        _service.ExecuteAsync(request.Id, cancellationToken);
}