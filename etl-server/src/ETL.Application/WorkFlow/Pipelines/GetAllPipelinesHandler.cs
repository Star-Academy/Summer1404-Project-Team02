using ETL.Application.Abstractions.Pipelines;
using ETL.Domain.Entities;
using MediatR;

namespace ETL.Application.WorkFlow.Pipelines;
public record GetAllPipelinesQuery() : IRequest<IEnumerable<Pipeline>>;

public class GetAllPipelinesHandler : IRequestHandler<GetAllPipelinesQuery, IEnumerable<Pipeline>>
{
    private readonly IGetAllPipelines _service;

    public GetAllPipelinesHandler(IGetAllPipelines service) => _service = service;

    public Task<IEnumerable<Pipeline>> Handle(GetAllPipelinesQuery request, CancellationToken cancellationToken) =>
        _service.ExecuteAsync(cancellationToken);
}