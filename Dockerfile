FROM node:22-bookworm

WORKDIR /workspace

RUN npm install -g pnpm && \
    apt-get update && apt-get install -y \
    git \
    curl \
    openjdk-17-jdk \
    && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["node"]
