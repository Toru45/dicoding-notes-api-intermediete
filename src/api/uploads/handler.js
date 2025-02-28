class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    // validasi nilai data.hapi.reader
    this._validator.validateImageHeaders(data.hapi.headers);

    const fileLocation = await this._service.writeFile(data, data.hapi);

    const response = h.response({
      status: 'success',
      data: {
        fileLocation,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
