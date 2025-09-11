﻿using ETL.Domain.Common;

namespace ETL.Domain.Entities;

public class Pipeline : BaseEntity
{
    public string Name { get; private set; }

    // Foreign key to DataSetMetadata
    public Guid DataSourceId { get; private set; }
    public DataSetMetadata DataSource { get; private set; }

    // Navigation to steps
    public List<PipelineStep> Steps { get; private set; } = new();

    private Pipeline() { } // Required by EF Core

    public Pipeline(string name, Guid dataSourceId)
    {
        Name = name;
        DataSourceId = dataSourceId;
    }

    public void AddStep(PipelineStep step)
    {
        Steps.Add(step);
    }
    
    public void Rename(string newName)
    {
        Name = newName;
    }
}