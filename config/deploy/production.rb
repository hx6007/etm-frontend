application = ENV['app'] || "etm-frontend"
server = ENV['server_app'] || "root@"
set :application, application
set :deploy_to, "/react_apps/#{fetch(:application)}"
set :stage, :production
set :branch, :production
role :app, server

