import tensorflow as tf
import numpy as np

xs = [
    [0,0],
    [0,1],
    [1,1],
    [1,0]
]
ys = [
    [0],
    [1],
    [1],
    [0]
]

xs = np.array(xs)
ys = np.array(ys)

print(xs.shape)
print(ys.shape)

model = tf.keras.Sequential()
model.add(tf.keras.layers.Dense(
    4, 
    input_shape=(2,), 
    activation=tf.keras.activations.sigmoid))
model.add(tf.keras.layers.Dense(
    1, 
    activation=tf.keras.activations.sigmoid))
model.compile(
    optimizer=tf.train.GradientDescentOptimizer(learning_rate=0.1), 
    loss=tf.keras.losses.MeanSquaredError(), 
    metrics=[tf.keras.metrics.Accuracy()])
model.fit(xs, ys, epochs=1000)
print("*** Evaluation ***")
model.evaluate(xs, ys)
print("*** Predict Test ***")
print(model.predict(xs))