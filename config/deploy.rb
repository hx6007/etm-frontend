# config valid only for current version of Capistrano
# lock '3.8.0'

set :repo_url, 'ssh://git@gitlab.fslola.cn:8011/it/etm-frontend.git'

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('app/utils/serverUrl.js')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :npm, 'run build'
      # end
    end
  end

  after :published, :set_current_revision do
    on release_roles :all do |host|
      within release_path do
        puts "release_path : #{release_path}"
        execute :npm, 'install'
        execute :ln, "-f #{deploy_to}/shared/app/utils/serverUrl.js #{release_path}/app/utils/serverUrl.js"
        execute :npm, 'run build'
      end
    end
  end
end
