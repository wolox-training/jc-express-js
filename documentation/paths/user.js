module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'signup',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserSignUp'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/user_id'
              },
              example: {
                user_id: 62
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'This field is required password',
                internal_code: 'missing_data_error'
              }
            }
          }
        },
        422: {
          description: 'Unprocessable Entity',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message:
                  'email: This field must be a valid email. email: The email must include the wolox.co domain. password: This field must be alphanumeric',
                internal_code: 'validation_error'
              }
            }
          }
        }
      }
    }
  }
};
