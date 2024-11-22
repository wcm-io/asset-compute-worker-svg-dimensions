# wcm.io AEM Asset Compute SVG Dimensions

AEM Asset Compute Worker to extract width/height dimensions from SVG binary.

## Deploy for usage with AEM as a Cloud Service

### Deploy to AppBuilder Console

System requirements:
* [aio-cli](https://github.com/adobe/aio-cli)
* [aio-asset-compute-plugin](https://github.com/adobe/aio-cli-plugin-asset-compute)

Deployment steps:

1. Login to https://developer.adobe.com
2. Create a new project with "Project from template" using the "App Builder" template
    * Project name: _wcmio AEM Asset Compute SVG Dimensions_
    * App name: _wcmioAssCmpSvgDim_
    * (You may also use different names for your environment, but make sure they are not too long and do not include invalid characters)
3. For both _Production_ and _Stage_ workspaces, add an "API" service for "Asset Compute"
    * Use a custom credential name for Production: _wcmioAssCmpSvgDim_production_
    * Use a custom credential name for Stage: _wcmioAssCmpSvgDim_stage_
    * (The credential name auto-created by the wizard may be too long, so use custom names)
4. Download the JSON configuration files for both _Production_ and _Stage_ workspaces
5. Clone https://github.com/wcm-io/asset-compute-worker-svg-dimensions
6. Deploy the worker to both workspaces (execute the following steps once for each work space)
    ```
    aio login
    aio app use <path to downloaded json for workspace>
    aio app deploy
    ```
7. For both workspaces, get the generated worker URL via
    ```
    aio app get-url
    ```

### Define Processing Profile in AEM

1. With AEM Author, go to Tools > Assets > Processing Profiles
2. Create a new processing profile named _wcm.io AEM Asset Compute SVG Dimensions_
3. Add a new "Custom" processing service
4. Enable "Create Metadata Rendition" flag
5. Enter the worker URL (use _Stage_ for DEV and STAGE environments, and _Production_ for PROD environment)
6. Set Mime Types - Includes to
    ```
    image/svg\+xml
    ```
    (the backslash is requirement for escaping)



## Development


### Test

- Run `aio app test` to run asset compute worker tests (requires Docker)

### Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app
