from django.shortcuts import render, redirect
from django.http import JsonResponse

# Create your views here.


def timer_view(request): 
    return render(request, 'timer_page.html')

def send_message(request):
    if request.method == 'POST':
        message = request.POST.get('content', '')
        print(message)
        request.session['last_message'] = message
        return redirect('/')

    return render(request, 'send_msg.html')

def get_last_message(request):
    # Dobijanje poslednje poruke iz sesije
    last_message = request.session.get('last_message', '')

    # Vraćanje poslednje poruke kao JSON odgovor
    return JsonResponse({'last_message': last_message})