using ETL.Application.Abstractions.Pipelines;
using ETL.Application.Common;
using ETL.Domain.Entities;
using MediatR;

namespace ETL.Application.WorkFlow.Plugins;

public record GetPluginsByPipelineIdQuery(Guid PipelineId) : IRequest<Result<IEnumerable<Plugin>>>;

public sealed class GetPluginsByPipelineIdQueryHandler 
    : IRequestHandler<GetPluginsByPipelineIdQuery, Result<IEnumerable<Plugin>>>
{
    private readonly IGetPluginsByPipelineId _getPluginsByPipelineId;
    private readonly IGetPipelineById _getPipelineById;

    public GetPluginsByPipelineIdQueryHandler(
        IGetPluginsByPipelineId getPluginsByPipelineId,
        IGetPipelineById getPipelineById)
    {
        _getPluginsByPipelineId = getPluginsByPipelineId;
        _getPipelineById = getPipelineById;
    }

    public async Task<Result<IEnumerable<Plugin>>> Handle(GetPluginsByPipelineIdQuery request, CancellationToken cancellationToken)
    {
        var pipeline = await _getPipelineById.ExecuteAsync(request.PipelineId, cancellationToken);
        if (pipeline == null)
        {
            return Result.Failure<IEnumerable<Plugin>>(
                Error.NotFound("PluginGet.Failed", $"Pipeline {request.PipelineId} not found"));
        }

        var plugins = await _getPluginsByPipelineId.ExecuteAsync(request.PipelineId, cancellationToken);
        return Result.Success(plugins);
    }
}