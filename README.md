
<div align="center">
  <h1 align="center">Next Gen RPC Node</h1>

  <p align="center">
    Introducing the Next Gen RPC Node: A robust solution that combines multiple RPC endpoints to enhance availability, reduce latency, and bolster security. This open-source tool is perfect for all DApp developers seeking reliable and efficient endpoint management.
  </p>
</div>

## Applicable for such blockchain protocols:
Arbitrum: https://github.com/cyberwider/next-gen-rpc/blob/main/arbitrum.config-example.json 
Aurora (Near's EVM): https://github.com/cyberwider/next-gen-rpc/blob/main/aurora.config-example.json
Aztec: https://github.com/cyberwider/next-gen-rpc/blob/main/aztec.config-example.json
Base: https://github.com/cyberwider/next-gen-rpc/blob/main/base.config-example.json
BSC: https://github.com/cyberwider/next-gen-rpc/blob/main/bnb.config-example.json
Ethereum: https://github.com/cyberwider/next-gen-rpc/blob/main/ethereum.config-example.json
Filecoin EVM: https://github.com/cyberwider/next-gen-rpc/blob/main/filecoin.config-example.json
Gnosis Chain: https://github.com/cyberwider/next-gen-rpc/blob/main/gnosis.config-example.json
Mantle: https://github.com/cyberwider/next-gen-rpc/blob/main/mantle.config-example.json
Neon EVM: https://github.com/cyberwider/next-gen-rpc/blob/main/neon-evm.config-example.json
Polygon: https://github.com/cyberwider/next-gen-rpc/blob/main/polygon.config-example.json
Scroll: https://github.com/cyberwider/next-gen-rpc/blob/main/scroll.config-example.json
StarkNet: https://github.com/cyberwider/next-gen-rpc/blob/main/starknet.config-example.json
zkSync: https://github.com/cyberwider/next-gen-rpc/blob/main/zksync.config-example.json

## Simplified Architecture Overview

Our system utilizes [Cloudflare Workers](https://workers.cloudflare.com/) alongside the Cloudflare KV Storage plugin and the Cloudflare Caching API for optimal performance and reliability.

## Easy Start Guide

### Quick Setup

1. **Local Environment Setup**: Install npm and yarn on your machine.
2. **Cloudflare Account**: Register for a Cloudflare account.
3. **Install Dependencies**: Run the following command:

   ```bash
   yarn install
   ```

4. **Wrangler Configuration**: Log in to your Wrangler account locally:

   ```bash
   yarn run wrangler login
   ```

### Node List Setup

1. **Create KV Namespace in Cloudflare KV**:

   - For development, set up a preview KV:

     ```shell
     yarn run wrangler kv:namespace create CONFIG_KV --preview
     ```

   - For production, set up a regular KV:

     ```shell
     yarn run wrangler kv:namespace create CONFIG_KV
     ```

   Then, insert the provided config into your `wrangler.toml` file. Here's an example for both development and production setups:

   - Development:
     ```toml
     kv_namespaces = [
         { binding = "CONFIG_KV", preview_id = "PREVIEW_ID" }
     ]
     ```

   - Production:
     ```toml
     kv_namespaces = [
         { binding = "CONFIG_KV", id = "ID" },
     ]
     ```

2. **Prepare Your Node List**:

   - Use the structure provided in [node-config-example.json](node-config-example.json) as a template.
   - You can enhance routing efficiency by specifying geographical coordinates for each node. Services like [IP Info](https://ipinfo.io/) can help extract this information from IP addresses.

3. **Enter Node List Data into KV Namespace**:

   - Access the Cloudflare UI, navigate to the Workers KV page, and select your namespace.
   - Add a new entry:
     - Key: `origins`
     - Value: Your node list in valid JSON format (see [node-config-example.json](node-config-example.json) for reference).

### Local Development

1. Ensure your KV namespace is set up and the node list is properly configured.
2. Start the local server with:

   ```shell
   yarn run wrangler dev
   ```

### Deployment

1. Verify that the KV namespace and node list are configured correctly.
2. Deploy your worker code to Cloudflare Workers:

   ```shell
   yarn run wrangler publish
   ```

## Team

- [Vasily Rudomanov](https://www.linkedin.com/in/vrudomanov/)
