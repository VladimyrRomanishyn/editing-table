# Тестовое задание #

Для выполнения задания Вам необходимо сделать следующие шаги:

1. Склонировать репозиторий
2. npm install
3. npm start

##Само задание состоит в следующем##
Создать таблицу для вывода и редактирования массива данных. 
Колонки таблицы должны быть конфигурируемыми. Настройки  колонки должны содержать свойства header (заголовок колонки) и dataIndex (название свойства объекта, выводимого в этой колонке).

Для редактирования данных поля должны быть фокусируемыми. При этом в каждый момент времени в фокусе должно находиться ровно одно поле. Фокусом можно управлять с помощью клавиш UP, DOWN, LEFT, RIGHT, а так же с помощью одинарного клика левой кнопкой мыши. При нажатии ENTER или при двойном клике левой кнопкой мыши на поле (в этом случе оно автоатически получает фокус), соответсвующее поле становится редактируемым (его содержимое заменяется на input). При повторном нажатии ENTER в инпуте данные из него записываются в объект, который в данный момент редатируется и в соответствующую ячейку таблицы. Input при этом убирается, а поле остается в фокусе. При нажатии ESC в input-е, он убирается, данные из него сбрасываются, а поле остается в фокусе. Если во время редактирования поля кликнуть левой кнопкой мыши на другом поле, input убирается, данные из него сбрасываются, а фокус получает поле, на котором кликнули.

##Пример использования##
    <e-table [data]="data">
        <e-col header="First Name" dataIndex="fistName"></e-col>
        <e-col header="Second Name" dataIndex="secondName"></e-col>
        <e-col header="Age" dataIndex="age"></e-col>
    </e-table>