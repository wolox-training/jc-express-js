module.exports = {
  user_id: {
    type: 'integer',
    example: 7
  },
  firstName: {
    type: 'string',
    example: 'john'
  },
  lastName: {
    type: 'string',
    example: 'doe'
  },
  email: {
    type: 'string',
    example: 'tom.engels@wolox.co'
  },
  password: {
    type: 'string',
    example: 'xTestx123'
  },
  UserSignUp: {
    type: 'object',
    properties: {
      firstName: {
        $ref: '#/components/schemas/firstName'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  User: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/user_id'
      },
      firstName: {
        $ref: '#/components/schemas/firstName'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
