# Privacy Api

## Directory
`/server`

## Development

### Running locally
`$ yarn run:dev`

### Running tests
`$ yarn test`

-or-

`$ yarn test:watch`

### Running docs
`$ yarn docs`

# Privacy Admin

## Directory
`/admin`

## Development

### Running locally
`$ yarn run:dev`

### Running tests
`$ yarn test`

-or-

`$ yarn test:watch`

## Development tools
Prisma files should deploy when the server is started, if you need to manually manage the prisma install, you can do so with the following npm scripts.

### Generating Prisma files
`$ yarn generate`

### Deploying prisma config to prisma server
1) Deploy to dev `$ yarn prisma-deploy:dev`
1) Deploy to test `$ yarn prisma-deploy:test`
