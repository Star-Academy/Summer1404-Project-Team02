using ETL.Application.Abstractions.Pipelines;
using ETL.Application.Common;
using MediatR;

namespace ETL.Application.WorkFlow.Plugins;

public record UpdatePluginCommand(Guid PluginId, string Configuration) : IRequest<Result>;

public sealed class UpdatePluginCommandHandler : IRequestHandler<UpdatePluginCommand, Result>
{
    private readonly IUpdatePlugin _updatePlugin;
    private readonly IGetPluginById _getPluginById;

    public UpdatePluginCommandHandler(IUpdatePlugin updatePlugin, IGetPluginById getPluginById)
    {
        _updatePlugin = updatePlugin;
        _getPluginById = getPluginById;
    }

    public async Task<Result> Handle(UpdatePluginCommand request, CancellationToken cancellationToken)
    {
        //validate configuration too
        var plugin = await _getPluginById.ExecuteAsync(request.PluginId, cancellationToken);
        if (plugin == null)
            return Result.Failure(Error.NotFound("Plugin.Update", $"Plugin {request.PluginId} not found"));

        plugin.ChangeConfiguration(request.Configuration);

        await _updatePlugin.ExecuteAsync(plugin, cancellationToken);

        return Result.Success();
    }
}