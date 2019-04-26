sudo kubectl delete -f ui_deployment_green.yaml
sudo kubectl delete -f ui_service_green.yaml
sudo kubectl apply -f ui_deployment_green.yaml
sudo kubectl apply -f ui_service_green.yaml
