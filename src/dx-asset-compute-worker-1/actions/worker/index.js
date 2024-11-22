'use strict';

const { worker } = require('@adobe/asset-compute-sdk');
const { serializeXmp } = require('@adobe/asset-compute-xmp');
const fs = require('fs').promises;
const sizeOf = require("image-size");

exports.main = worker(async (source, rendition) => {
  // detect SVG dimension
  const xmpData = {};
  try {
    const dimensions = sizeOf(source.path);
    if (dimensions?.width && dimensions?.height) {
      xmpData["tiff:ImageWidth"] = dimensions.width;
      xmpData["tiff:ImageLength"] = dimensions.height;
    }
  }
  catch (e) {
    console.error("Failed to detect SVG dimensions.", e);
  }

  // serialize as XMP metadata
  const xmp = serializeXmp(
    xmpData,
    {
      namespaces: {
        tiff: "http://ns.adobe.com/tiff/1.0/"
      }
    });

  // save the XMP metadata to disk
  await fs.writeFile(rendition.path, xmp, "utf-8");
});
