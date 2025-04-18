module.exports = {
  friendlyName: "Image upload",

  description: "",

  files: ["images"],

  inputs: {
    images: {
      type: "ref",
      description: "Uploaded file stream",

      required: true,
    },
    name: {
      type: "string",
      description: "Upload file name",
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    try {
      inputs.images.upload(
        {
          dirname: require("path").resolve(
            sails.config.appPath,
            "assets/images"
          ),
          saveAs(file, cb) {
            console.log(inputs.name);
            let ext = file.filename.split(".").pop();
            cb(null, `${inputs.name || file.filename}_${Date.now()}.${ext}`);
          },
        },
        (err, uploadedFiles) => {
          if (err) {
            return exits.error(err);
          }

          return exits.success({
            message: uploadedFiles.length + " file(s) uploaded successfully!",
            files: uploadedFiles,
          });
        }
      );
      return exits.success("Success Response");
    } catch (error) {
      return exits.error(error);
    }
  },
};
