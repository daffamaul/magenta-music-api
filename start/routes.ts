/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AlbumsController = () => import('#controllers/albums_controller')
const AuthenticationController = () => import('#controllers/authentication_controller')
const PlaylistsController = () => import('#controllers/playlists_controller')
const SongController = () => import('#controllers/song_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

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

router
  .group(() => {
    router.post('/', [AlbumsController, 'store'])
    router.get('/:id', [AlbumsController, 'show'])
    router.put('/:id', [AlbumsController, 'update'])
    router.delete('/:id', [AlbumsController, 'destroy'])
  })
  .prefix('/albums')

router
  .group(() => {
    router.post('/', [AuthenticationController, 'store'])
    router.put('/', [AuthenticationController, 'update'])
    router.delete('/', [AuthenticationController, 'destroy'])
  })
  .prefix('/authentications')

router
  .group(() => {
    router.post('/', [PlaylistsController, 'store'])
    router.get('/', [PlaylistsController, 'index'])
    router.delete('/:id', [PlaylistsController, 'destroy'])
    router.post('/:id/songs', [PlaylistsController, 'addSongToPlaylist'])
    router.get('/:id/songs', [PlaylistsController, 'getSongsInPlaylist'])
    router.delete('/:id/songs', [PlaylistsController, 'deleteSongInPlaylist'])
  })
  .prefix('/playlists')
  .use(middleware.auth())
