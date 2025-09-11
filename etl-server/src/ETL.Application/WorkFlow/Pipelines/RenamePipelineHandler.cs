using ETL.Application.Abstractions.Pipelines;
using ETL.Application.Common;
using MediatR;

namespace ETL.Application.WorkFlow.Pipelines;

public record RenamePipelineCommand(Guid Id, string NewName) : IRequest<Result>;

public sealed class RenamePipelineHandler : IRequestHandler<RenamePipelineCommand, Result>
{
    private readonly IRenamePipeline _renamePipeline;
    private readonly IGetPipelineById _getPipelineById;

    public RenamePipelineHandler(IRenamePipeline renamePipeline, IGetPipelineById getPipelineById)
    {
        _renamePipeline = renamePipeline;
        _getPipelineById = getPipelineById;
    }

    public async Task<Result> Handle(RenamePipelineCommand request, CancellationToken cancellationToken)
    {
        var pipeline = await _getPipelineById.ExecuteAsync(request.Id, cancellationToken);
        if (pipeline == null)
            return Result.Failure(Error.NotFound("PipelineDelete.Failed", $"Pipeline {request.Id} not found!"));

        await _renamePipeline.ExecuteAsync(request.Id, request.NewName, cancellationToken);
        return Result.Success();
    }
}