using ETL.Application.Abstractions.Pipelines;
using MediatR;

namespace ETL.Application.WorkFlow.Pipelines;

public record RenamePipelineCommand(Guid Id, string NewName) : IRequest;

public class RenamePipelineHandler : IRequestHandler<RenamePipelineCommand>
{
    private readonly IRenamePipeline _service;

    public RenamePipelineHandler(IRenamePipeline service) => _service = service;

    public async Task Handle(RenamePipelineCommand request, CancellationToken cancellationToken)
    {
        await _service.ExecuteAsync(request.Id, request.NewName, cancellationToken);
        //return Unit.Value;
    }
}