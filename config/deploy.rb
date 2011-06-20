set :application, "skeleton"
set :scm, :git
set :repository, "git@github.com:gentooist/skeleton.git"
set :user, "username"
set :host, "some.domain.com"
set :deploy_to, "/home/user/sites/skeleton"
set :deploy_via, :export

role :app, host

namespace :deploy do
  task :start, :roles => :app, :except => { :no_release => true } do
    run "cd #{current_path} && NODE_ENV=production nohup node server.js start >> #{current_release}/logs/node_process.log < /dev/null 2>&1 &"
  end

  task :stop, :roles => :app, :except => { :no_release => true } do
    run "cd #{current_path} && NODE_ENV=production node server.js stop"
    run "cd #{current_path} && rm pids/*.pid"
  end

  task :restart, :roles => :app, :except => { :no_release => true } do
    run "cd #{current_path} && NODE_ENV=production node server.js stop"
    run "cd #{current_path} && rm pids/*.pid"
    run "cd #{current_path} && NODE_ENV=production nohup node server.js start >> #{current_release}/logs/node_process.log < /dev/null 2>&1 &"
  end
  
  task :finalize_update, :except => { :no_release => true } do
    run "cd #{latest_release} && jake modules:install"
    run "rm -rf #{latest_release}/logs"
    run "rm -rf #{latest_release}/pids"
    run "ln -s #{shared_path}/logs #{latest_release}/logs"
    run "ln -s #{shared_path}/pids #{latest_release}/pids"
  end

  task :migrate do
  end
end

after "deploy:update_code", "deploy:cleanup"
