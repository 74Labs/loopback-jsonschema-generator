import request from 'supertest';
import app from './example/';

describe('e2e Test', () => {
  let server;

  before((done) => {
    server = app.listen(done);
  });

  after((done) => {
    server.close(done);
  });

  it('should return a generated json schema based on the model', (done) => {
    request(server)
      .get('/api/products/test-json-schema')
      .expect('Content-Type', /json/)
      .expect(200, {
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'Products',
        type: 'object',
        properties: {
          id: {
            type: 'number'
          },
          name: {
            type: 'string',
            title: 'Name',
            required: true
          },
          price: {
            type: 'number',
            title: 'Price',
            required: true
          },
          addedDate: {
            type: 'string',
            title: 'Added Date',
            format: 'date-time'
          },
          inStock: {
            type: 'boolean',
            title: 'In Stock',
            required: false
          },
          tags: {
            title: 'Tags',
            type: 'array',
            items: {
              type: 'string'
            }
          },
          category: {
            type: 'object',
            title: 'Category',
            required: true,
            properties: {
              id: {
                type: 'number'
              },
              categoryName: {
                type: 'string',
                title: 'Category Name',
                required: true
              }
            }
          }
        },
        required: [
          'name',
          'price',
          'category'
        ]
      }, done);
  });
});
