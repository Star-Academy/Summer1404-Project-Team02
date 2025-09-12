using ETL.API.Infrastructure;
using ETL.Application.WorkFlow.Plugins;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ETL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PluginsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PluginsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{pipelineId}/get-plugins")]
    public async Task<IActionResult> GetAll(Guid pipelineId, CancellationToken ct)
    {
        var result = await _mediator.Send(new GetPluginsByPipelineIdQuery(pipelineId), ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);
    
        return Ok(result.Value);
    } //perhaps should go to pipeline controller

    [HttpGet("{pluginId}")]
    public async Task<IActionResult> GetById(Guid pluginId, CancellationToken ct)
    {
        var result = await _mediator.Send(new GetPluginByIdQuery(pluginId), ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);

        return Ok(result.Value);
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody] AddPluginCommand request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);

        return Ok(result.Value);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdatePluginCommand request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);

        return Ok(new { message = "plugin has been updated." });
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete([FromBody] DeletePluginCommand request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        if (result.IsFailure)
            return this.ToActionResult(result.Error);

        return Ok(new { message = "plugin has been deleted." });
    }
}
