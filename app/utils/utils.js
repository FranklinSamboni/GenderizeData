var queryElastic = {
    query: {
      bool: {
        must: [
          {
            bool: {
              should: [
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "villamayor",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "colsubsidio",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "itinerante",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "jumbo",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "americas",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "tesoro",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "colina",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "colombia",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "floresta",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "alamos",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "sandiego",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "facatativa",
                      fuzziness: "auto"
                    }
                  }
                },
                {
                  match: {
                    "data.aceptar_terminos.detail.location_name": {
                      query: "visitacion",
                      fuzziness: "auto"
                    }
                  }
                }
              ]
            }
          },
          {
            bool: {
              should: [
                {
                  range: {
                    "data.ingresar_codigo.date": {
                      gte: "2018-01-01T00:00:00-05:00"
                    }
                  }
                },
                {
                  range: {
                    "data.ver_portal.date": {
                      gte: "2018-01-01T00:00:00-05:00"
                    }
                  }
                }
              ]
            }
          },
          {
            bool: {
              must: [
                {
                  range: {
                    "data.aceptar_terminos.date": {
                      gte: "2018-01-01T00:00:00-05:00"
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    },
    size: 10000,
    _source:["name"]
  };

module.exports ={
    queryElastic
}