using ETL.Application.Abstractions.Pipelines;
using ETL.Domain.Entities;
using MediatR;

namespace ETL.Application.WorkFlow.Pipelines;

public record CreatePipelineCommand(string Name, Guid DataSourceId) : IRequest<Guid>;

public class CreatePipelineHandler : IRequestHandler<CreatePipelineCommand, Guid>
{
    private readonly ICreatePipeline _service;

    public CreatePipelineHandler(ICreatePipeline service) => _service = service;

    public async Task<Guid> Handle(CreatePipelineCommand request, CancellationToken cancellationToken)
    {
        var pipeline = new Pipeline(request.Name, request.DataSourceId);
        return await _service.ExecuteAsync(pipeline, cancellationToken);
    }
}