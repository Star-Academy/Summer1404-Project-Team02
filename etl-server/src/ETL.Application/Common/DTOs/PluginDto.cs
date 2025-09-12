namespace ETL.Application.Common.DTOs;

public record PluginDto(Guid Id, Guid PipelineId, string PluginType, string Configuration, DateTime CreatedAt);