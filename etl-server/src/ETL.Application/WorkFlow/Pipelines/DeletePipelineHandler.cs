using ETL.Application.Abstractions.Pipelines;
using MediatR;

namespace ETL.Application.WorkFlow.Pipelines;

public record DeletePipelineCommand(Guid Id) : IRequest;


public class DeletePipelineHandler : IRequestHandler<DeletePipelineCommand>
{
    private readonly IDeletePipeline _service;

    public DeletePipelineHandler(IDeletePipeline service) => _service = service;

    public async Task Handle(DeletePipelineCommand request, CancellationToken cancellationToken)
    {
        await _service.ExecuteAsync(request.Id, cancellationToken);
        //return Unit.Value;
    }
}