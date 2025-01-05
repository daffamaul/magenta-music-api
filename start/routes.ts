/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SongController from '#controllers/song_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.post('/users', [UsersController, 'store'])

router
  .group(() => {
    router.get('/', [SongController, 'index'])
    router.post('/', [SongController, 'store'])
    router.get('/:id', [SongController, 'show'])
    router.put('/:id', [SongController, 'update'])
    router.delete('/:id', [SongController, 'destroy'])
  })
  .prefix('/songs')
