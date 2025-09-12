using ETL.Domain.Entities;

namespace ETL.Application.Common.DTOs;

public record PipelineDto(Guid Id, string Name, Guid DataSourceId, DateTime CreatedAt);