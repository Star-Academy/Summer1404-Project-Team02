using ETL.Application.Abstractions.Pipelines;
using ETL.Application.Common;
using ETL.Domain.Entities;
using MediatR;

namespace ETL.Application.WorkFlow.Plugins;

public record AddPluginCommand(Guid PipelineId, string PluginType, string Configuration) : IRequest<Result<Guid>>;

public sealed class AddPluginCommandHandler : IRequestHandler<AddPluginCommand, Result<Guid>>
{
    private readonly IAppendPlugin _appendPlugin;
    private readonly IGetPipelineById _getPipelineById;

    public AddPluginCommandHandler(IAppendPlugin appendPlugin, IGetPipelineById getPipelineById)
    {
        _appendPlugin = appendPlugin;
        _getPipelineById = getPipelineById;
    }

    public async Task<Result<Guid>> Handle(AddPluginCommand request, CancellationToken cancellationToken)
    {
        var pipeline = await _getPipelineById.ExecuteAsync(request.PipelineId, cancellationToken);
        if (pipeline == null)
        {
            return Result.Failure<Guid>(Error.NotFound("PluginCreate.Failed",
                $"pipeline {request.PipelineId} not found"));
        }
        //check the plugin type (how?)
        //check configuration valid (how?)
        var pluginId = await _appendPlugin.ExecuteAsync(request.PipelineId, request.PluginType, request.Configuration,
            cancellationToken);
        return Result.Success(pluginId);
    }
}