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
                message: 'Some params do not have a valid value',
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
                message: 'Some params do not have a valid value',
                internal_code: 'validation_error'
              }
            }
          }
        }
      }
    }
  }
};
