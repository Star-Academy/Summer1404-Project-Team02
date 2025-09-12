using ETL.Application.Abstractions.Pipelines;
using ETL.Domain.Entities;
using MediatR;

namespace ETL.Application.WorkFlow.Plugins;

public record AddPluginCommand(Guid PipelineId, int StepOrder, string PluginType, string Configuration) : IRequest<Guid>;

public sealed class AddPluginCommandHandler : IRequestHandler<AddPluginCommand, Guid>
{
    private readonly IAddPlugin _addPlugin;

    public AddPluginCommandHandler(IAddPlugin addPlugin)
    {
        _addPlugin = addPlugin;
    }

    public async Task<Guid> Handle(AddPluginCommand request, CancellationToken cancellationToken)
    {
        var plugin = new Plugin(request.PipelineId, request.StepOrder, request.PluginType, request.Configuration);
        await _addPlugin.ExecuteAsync(plugin, cancellationToken);
        return plugin.Id;
    }
}