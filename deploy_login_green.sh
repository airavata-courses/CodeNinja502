sudo kubectl delete -f login_deployment_green.yaml
sudo kubectl delete -f login_service_green.yaml
sudo kubectl apply -f login_deployment_green.yaml
sudo kubectl apply -f login_service_green.yaml
