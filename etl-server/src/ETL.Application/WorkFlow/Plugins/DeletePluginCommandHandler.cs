using ETL.Application.Abstractions.Pipelines;
using ETL.Application.Common;
using MediatR;

namespace ETL.Application.WorkFlow.Plugins;

public record DeletePluginCommand(Guid PluginId) : IRequest<Result>;

public sealed class DeletePluginCommandHandler : IRequestHandler<DeletePluginCommand, Result>
{
    private readonly IGetPluginById _getPluginById;
    private readonly IDeletePlugin _deletePlugin;

    public DeletePluginCommandHandler(IGetPluginById getPluginById, IDeletePlugin deletePlugin)
    {
        _getPluginById = getPluginById;
        _deletePlugin = deletePlugin;
    }

    public async Task<Result> Handle(DeletePluginCommand request, CancellationToken cancellationToken)
    {
        var plugin = await _getPluginById.ExecuteAsync(request.PluginId, cancellationToken);
        if (plugin is null)
        {
            return Result.Failure(
                Error.NotFound("PluginDelete.Failed", $"Plugin {request.PluginId} not found"));
        }

        await _deletePlugin.ExecuteAsync(request.PluginId, cancellationToken);

        return Result.Success();
    }
}