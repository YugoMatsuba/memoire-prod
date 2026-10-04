# mémoire — architecture

```mermaid
flowchart LR

    %% =========================
    %% FRONTEND
    %% =========================
    subgraph CLIENT["Client"]
        FE["React + TypeScript<br/><br/>• Interactive Globe<br/>• Memories<br/>• Groups & Friends<br/>• Messaging<br/>• Media Uploads<br/>• Timeline"]
    end

    %% =========================
    %% API GATEWAY
    %% =========================
    GW["API Gateway<br/><br/>• Single Entry Point<br/>• Authentication<br/>• Request Routing<br/>• Rate Limiting"]

    FE <-->|"HTTPS / REST<br/>WebSocket"| GW

    %% =========================
    %% BACKEND MICROSERVICES
    %% =========================
    subgraph SERVICES["Backend Microservices — FastAPI"]

        CORE["Core Service<br/><br/>• Users & Authentication<br/>• Friends & Groups<br/>• Memories & Comments<br/>• Locations<br/>• Search & Notifications"]

        CHAT["Chat Service<br/><br/>• Direct Messages<br/>• Group Chat<br/>• WebSocket Connections<br/>• Message History"]

        MEDIA["Media Service<br/><br/>• File Uploads<br/>• Media Metadata<br/>• Access Control<br/>• Background Processing"]
    end

    GW -->|"/core/*"| CORE
    GW -->|"/chat/*"| CHAT
    GW -->|"/media/*"| MEDIA

    %% =========================
    %% DATABASES / STORAGE
    %% =========================
    subgraph DATA["Data Layer"]

        PG[("PostgreSQL<br/><br/>Users<br/>Groups<br/>Memories<br/>Locations")]

        MONGO[("MongoDB<br/><br/>Conversations<br/>Messages<br/>Chat Metadata")]

        S3[("Object Storage<br/>S3 / MinIO<br/><br/>Original Media<br/>Thumbnails<br/>Processed Files")]
    end

    CORE --> PG
    CHAT --> MONGO
    MEDIA --> S3

    %% =========================
    %% SHARED INFRASTRUCTURE
    %% =========================
    subgraph INFRA["Background Processing"]

        REDIS[("Redis<br/><br/>• Cache<br/>• Celery Broker<br/>• Temporary State")]

        CELERY["Celery Workers<br/><br/>• Thumbnail Generation<br/>• Image Compression<br/>• EXIF Extraction<br/>• Notification Tasks"]
    end

    %% Redis usage
    CORE -->|"Cache"| REDIS
    MEDIA -->|"Enqueue Task"| REDIS

    %% Celery background processing
    REDIS -->|"Task Queue"| CELERY
    CELERY -->|"Read / Write Media"| S3
    CELERY -->|"Update Metadata"| PG

    %% =========================
    %% STYLING
    %% =========================
    classDef frontend fill:#e8f3ff,stroke:#3b82f6,stroke-width:2px,color:#111;
    classDef gateway fill:#eee7ff,stroke:#7c3aed,stroke-width:2px,color:#111;
    classDef core fill:#eaf8ee,stroke:#16a34a,stroke-width:2px,color:#111;
    classDef chat fill:#eaf4ff,stroke:#2563eb,stroke-width:2px,color:#111;
    classDef media fill:#fff3e5,stroke:#f97316,stroke-width:2px,color:#111;
    classDef database fill:#f8fafc,stroke:#64748b,stroke-width:2px,color:#111;
    classDef redis fill:#ffeaea,stroke:#dc2626,stroke-width:2px,color:#111;
    classDef celery fill:#fff7d6,stroke:#ca8a04,stroke-width:2px,color:#111;

    class FE frontend;
    class GW gateway;
    class CORE core;
    class CHAT chat;
    class MEDIA media;
    class PG,MONGO,S3 database;
    class REDIS redis;
    class CELERY celery;
```

## Main Flow

- **React + TypeScript** communicates with the backend through the **API Gateway**.
- The gateway routes requests to the appropriate **FastAPI microservice**.
- **Core Service** owns the main social and memory domain and uses **PostgreSQL**.
- **Chat Service** handles real-time messaging and uses **MongoDB**.
- **Media Service** handles uploaded media and stores files in **S3 / MinIO**.
- **Redis** provides shared infrastructure such as caching and acts as the **Celery broker**.
- **Celery workers** execute expensive asynchronous jobs such as thumbnail generation, image compression, EXIF extraction, and notification processing.
